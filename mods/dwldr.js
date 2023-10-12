var JSZip = require("jszip");

module.exports = {
    file: async function (file) {
        try {
            console.log("HELPER (GTFS-DWLDR): Fetching file: " + file)
            // Fetch the ZIP file from the URL
            const zipFileResponse = await fetch("https://www.octranspo.com/files/google_transit.zip");

            // Check if the fetch was successful
            console.log("HELPER (STATUS)",zipFileResponse.code)
            if (!zipFileResponse.code === 200) {
                console.log("HELPER (GTFS-DWLDR) ERROR : " + zipFileResponse.status);
                return "ERROR- (f)" + zipFileResponse.status
            }
            // Read the ZIP file as a Uint8Array
            const zipFileData = await zipFileResponse.arrayBuffer();

            // Create a new ZIP archive object
            const zip = new JSZip();

            // Load the ZIP data
            await zip.loadAsync(zipFileData);

            // Extract the "trips.txt" file from the ZIP archive
            const tripsTxtFile = await zip.file(file).async('text');
            // Return the contents of the "trips.txt" file as the response
            console.log("File Returned")
            return tripsTxtFile.split("\n");
        } catch (error) {
            console.log(error)
            return "ERROR-500"
        }
    }
}