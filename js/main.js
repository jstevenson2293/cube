//https://github.com/mdn/webgl-examples/tree/main/webgl-examples/tutorial/sample5
//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL


//
//start here
//
function main () {
    const canvas = document.querySelector('#glCanvas')
    //inintialize the GL context
    const gl = canvas.getContext("webgl")

    // Only continue if WebGL is working 
    if (gl === null) {
        alert(
            "Unable to initialize WebGL. Your browser or machine may not support it."
            );
        return;
    }

    // set clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1,0)
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader program
    const vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
        `;
    const fsSource = `
    void main () {
        gl_Frag = vec4(1.0, 1.0, 1.0, 1.0);
    }`;     


    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    //If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
                shaderProgram
            )}`
        );
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and compiles it
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    //Send the source to the shader object
    gl.shaderSource(shader, source);
    //Compile the shader program
    gl.compileShader(shader);
    //See if it compiled successfully
    if (!gl.getShderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            `An error occured compiling the shaders: ${gl.getShaderInfoLog(shader)}`
        );
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}



window.onload = main;