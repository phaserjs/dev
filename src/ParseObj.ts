// Map .obj vertex info line names to our returned property names
const vertexInfoNameMap = {v: 'vertexPositions', vt: 'vertexUVs', vn: 'vertexNormals'}

// @author https://www.npmjs.com/package/wavefront-obj-parser

export function ParseObj (wavefrontString) {

  var parsedJSON = {vertexNormals: [], vertexUVs: [], vertexPositions: [], vertexNormalIndices: [], vertexUVIndices: [], vertexPositionIndices: []}

  var linesInWavefrontObj = wavefrontString.split('\n')

  var currentLine, currentLineTokens, vertexInfoType, i, k

  // Loop through and parse every line in our .obj file
  for (i = 0; i < linesInWavefrontObj.length; i++) {
    currentLine = linesInWavefrontObj[i]
    // Tokenize our current line
    currentLineTokens = currentLine.trim().split(/\s+/)
    // vertex position, vertex texture, or vertex normal
    vertexInfoType = vertexInfoNameMap[currentLineTokens[0]]

    if (vertexInfoType) {
      for (k = 1; k < currentLineTokens.length; k++) {
        parsedJSON[vertexInfoType].push(parseFloat(currentLineTokens[k]))
      }
      continue
    }

    if (currentLineTokens[0] === 'f') {
      // Get our 4 sets of vertex, uv, and normal indices for this face
      for (k = 1; k < 5; k++) {
        // If there is no fourth face entry then this is specifying a triangle
        // in this case we push `-1`
        // Consumers of this module should check for `-1` before expanding face data
        if (k === 4 && !currentLineTokens[4]) {
          parsedJSON.vertexPositionIndices.push(-1)
          parsedJSON.vertexUVIndices.push(-1)
          parsedJSON.vertexNormalIndices.push(-1)
        } else {
          var indices = currentLineTokens[k].split('/')
          parsedJSON.vertexPositionIndices.push(parseInt(indices[0], 10) - 1) // We zero index
          parsedJSON.vertexUVIndices.push(parseInt(indices[1], 10) - 1) // our face indices
          parsedJSON.vertexNormalIndices.push(parseInt(indices[2], 10) - 1) // by subtracting 1
        }
      }
    }
  }

  return parsedJSON
}
