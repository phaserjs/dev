/**
 * Decompress a set of position, normal and uv indices and their
 * accompanying data.
 * This solves for situations when you are re-using the same
 * vertex positions but with a different normal or uv index.
 * You can't have multiple indices (ELEMENT_ARRAY_BUFFER) in
 * WebGL, so this module the data expands your data so that it
 * can use one ELEMENT_ARRAY_BUFFER for your vertex position indices
 *
 * TODO: Look into whether or not it's worth checking when deduping indices
 * whether or not all of the other indices would have been the same.
 * Seems like the potential savings would be negligible if any.. but look into it
 * Yeah.... a triangle saved is a triangle earned...
 */
export function ExpandVertexData (compressedVertexData, opts: any = {})
{
    // Handles wavefront .obj files that can have lines with
    // 3 vertices (triangle) or 4 (face).
    // Specifically designed to work with the JSON that `wavefront-obj-parser` provides.
    // If we find a `-1` as the fourth number it means was a triangle line.
    // Otherwise it is a face line that we'll expand into two triangles
    // `1 2 3 -1` would be a set of triangle indices
    // `1 2 3 4` would be a face that we'd expand into `1 2 3 1 3 4`
    if (opts.facesToTriangles) {
      var decodedVertexPositionIndices = []
      var decodedVertexUVIndices = []
      var decodedVertexNormalIndices = []

      for (var i = 0; i < compressedVertexData.vertexPositionIndices.length / 4; i++) {
        decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4])
        decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4 + 1])
        decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4 + 2])
        decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4])
        decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4 + 1])
        decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4 + 2])
        decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4])
        decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4 + 1])
        decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4 + 2])
        // If this is a face with 4 vertices we push a second triangle
        if (compressedVertexData.vertexPositionIndices[i * 4 + 3] !== -1) {
          decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4])
          decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4 + 2])
          decodedVertexPositionIndices.push(compressedVertexData.vertexPositionIndices[i * 4 + 3])
          decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4])
          decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4 + 2])
          decodedVertexUVIndices.push(compressedVertexData.vertexUVIndices[i * 4 + 3])
          decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4])
          decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4 + 2])
          decodedVertexNormalIndices.push(compressedVertexData.vertexNormalIndices[i * 4 + 3])
        }
      }

      compressedVertexData.vertexPositionIndices = decodedVertexPositionIndices
      compressedVertexData.vertexNormalIndices = decodedVertexNormalIndices
      compressedVertexData.vertexUVIndices = decodedVertexUVIndices
    }

    // Create the arrays that will hold our expanded vertex data
    var expandedPositionIndices = []
    var expandedPositions = []
    var expandedNormals = []
    var expandedUVs = []
    var expandedJointInfluences = []
    var expandedJointWeights = []

    // Track indices that we've already encountered so that we don't use them twice
    var encounteredPositionIndices = {}
    // Track the largest vertex position index that we encounter. When expanding
    // the data we will increment all vertex position indices that were used
    // more than once.
    // We will insert the proper data into the corresponding array indices
    // for our normal and uv arrays
    var largestPositionIndex = 0
    // Track which counters we've already encountered so that we can loop through them later
    var unprocessedVertexNums = {}

    compressedVertexData.vertexPositionIndices.forEach(function (positionIndex, vertexNum) {
      // Keep track of the largest vertex index that we encounter
      largestPositionIndex = Math.max(largestPositionIndex, positionIndex)
      // If this is our first time seeing this index we build all of our
      // data arrays as usual.
      if (!encounteredPositionIndices[positionIndex]) {
        // Mark this vertex index as encountered. We'll deal with encountered indices later
        encounteredPositionIndices[positionIndex] = true
        setVertexData(positionIndex, vertexNum)
      } else {
        unprocessedVertexNums[vertexNum] = true
      }
    })

    // Go over all duplicate vertex indices and change them to a new index number.
    // Then duplicate their relevant data to that same index number
    Object.keys(unprocessedVertexNums).forEach(function (vertexNum) {
      var positionIndex = ++largestPositionIndex

      setVertexData(positionIndex, vertexNum)
    })

    /**
     * Helper function to set the vertex data at a specified index.
     * This is what builds the arrays that we return to the module user for consumption
     */
    function setVertexData (positionIndex, vertexNum) {
      // The position index before we incremented it to dedupe it
      var originalPositionIndex = compressedVertexData.vertexPositionIndices[vertexNum]

      expandedPositionIndices[vertexNum] = positionIndex
      var jointsAndWeights
      if (compressedVertexData.vertexJointWeights) {
        jointsAndWeights = compressedVertexData.vertexJointWeights[originalPositionIndex]
      }

      for (var i = 0; i < 4; i++) {
        if (jointsAndWeights) {
          // 4 bone (joint) influences and weights per vertex
          var jointIndex = Object.keys(jointsAndWeights)[i]
          // TODO: Should zero be -1? It will have a zero weight regardless, but that lets us distinguish between empty bone slots and zero index bone slots
          // TODO: If there are more than 4 bones take the four that have the strongest weight
          expandedJointInfluences[positionIndex * 4 + i] = Number(jointIndex) || 0
          expandedJointWeights[positionIndex * 4 + i] = jointsAndWeights[jointIndex] || 0
        }

        // 3 normals and position coordinates per vertex
        if (i < 3) {
          expandedPositions[positionIndex * 3 + i] = compressedVertexData.vertexPositions[originalPositionIndex * 3 + i]
          if (compressedVertexData.vertexNormals) {
            expandedNormals[positionIndex * 3 + i] = compressedVertexData.vertexNormals[compressedVertexData.vertexNormalIndices[vertexNum] * 3 + i]
          }
        }
        // 2 UV coordinates per vertex
        if (i < 2) {
          if (compressedVertexData.vertexUVs) {
            expandedUVs[positionIndex * 2 + i] = compressedVertexData.vertexUVs[compressedVertexData.vertexUVIndices[vertexNum] * 2 + i]
          }
        }
      }
    }

    return {
      jointInfluences: expandedJointInfluences,
      jointWeights: expandedJointWeights,
      normals: expandedNormals,
      positionIndices: expandedPositionIndices,
      positions: expandedPositions,
      uvs: expandedUVs
    }
  }
