const fs = require("fs");
const path = require("path");
const Pbf = require("pbf").default;
const geobuf = require("geobuf");

const SOURCE_DIR = "/Users/jaredsurato/Downloads/2025102010_seagull_map_layers";
const TARGET_DIR = path.join(__dirname, "..", "assets", "map-layers");

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Get all PBF files
const pbfFiles = fs
  .readdirSync(SOURCE_DIR)
  .filter((file) => file.endsWith(".pbf"));

console.log(`Converting ${pbfFiles.length} PBF files to GeoJSON...`);

pbfFiles.forEach((filename) => {
  try {
    const pbfPath = path.join(SOURCE_DIR, filename);
    const buffer = fs.readFileSync(pbfPath);

    // Try to parse as geobuf
    let geojson;
    try {
      geojson = geobuf.decode(new Pbf(buffer));
      console.log(`✓ Converted ${filename} using geobuf`);
    } catch (err) {
      console.log(
        `⚠️  ${filename}: Could not parse as geobuf (${err.message}), skipping`
      );
      return;
    }

    // Write GeoJSON
    const geojsonFilename = filename.replace(".pbf", ".geojson");
    const geojsonPath = path.join(TARGET_DIR, geojsonFilename);
    fs.writeFileSync(geojsonPath, JSON.stringify(geojson, null, 2));

    console.log(`  → ${geojsonFilename}`);

    // Copy corresponding JSON and PNG files if they exist
    const baseName = filename.replace(".pbf", "");

    // Copy JSON bounds file
    const jsonFile = `${baseName}.json`;
    const jsonPath = path.join(SOURCE_DIR, jsonFile);
    if (fs.existsSync(jsonPath)) {
      fs.copyFileSync(jsonPath, path.join(TARGET_DIR, jsonFile));
      console.log(`  ✓ Copied ${jsonFile}`);
    }

    // Copy PNG directional file
    const pngFile = `${baseName}.png`;
    const pngPath = path.join(SOURCE_DIR, pngFile);
    if (fs.existsSync(pngPath)) {
      fs.copyFileSync(pngPath, path.join(TARGET_DIR, pngFile));
      console.log(`  ✓ Copied ${pngFile}`);
    }
  } catch (err) {
    console.error(`✗ Error processing ${filename}:`, err.message);
  }
});

console.log("\n✓ Conversion complete!");
console.log(`Output directory: ${TARGET_DIR}`);
