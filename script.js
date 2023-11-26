const blurInput = document.getElementById("blur");
const transparencyInput = document.getElementById("transparency");
const colorInput = document.getElementById("color");
const outlineInput = document.getElementById("outline");
const cssResult = document.getElementById("css-code");
const glassRec = document.querySelector(".glass-preview-rectangle"); // Debo usar 'querySelector' porque es una clase y no un id;

// Settear valores por defecto para la vista previa
blurInput.value = 1;
transparencyInput.value = 0.31;
colorInput.value = '#000';
outlineInput.value = 0;

// Inicializar el 'glass preview' con valor por defecto
updateGlassPreview();

// Añadir event listeners a los sliders
blurInput.addEventListener('input', updateGlassPreview);
transparencyInput.addEventListener('input', updateGlassPreview);
outlineInput.addEventListener('input', updateGlassPreview);

// Añadir event listeners al color input (color picker)
colorInput.addEventListener('input', () => {
    updateGlassPreview();
    updateCSSCode();
});

function updateGlassPreview() {
    const blurValue = blurInput.value;
    const transparencyValue = transparencyInput.value;
    const colorValue = colorInput.value;
    const outlineValue = outlineInput.value;

    // Actualizar la vista previa del rectángulo glass
    glassRec.style.backdropFilter = `blur(${blurValue}px)`;
    glassRec.style.backgroundColor = `rgba(${hexToRgb(colorValue)}, ${transparencyValue})`;
    glassRec.style.outline = `${outlineValue}px solid ${colorValue}`;

    updateCSSCode();
}

function updateCSSCode() {
    const blurValue = blurInput.value;
    const transparencyValue = transparencyInput.value;
    const colorValue = colorInput.value;
    const outlineValue = outlineInput.value;

    const cssCode = `background-color: rgba(${hexToRgb(colorValue)}, ${transparencyValue});
    \nbackdrop-filter: blur(${blurValue}px);
    \n-webkit-backdrop-filter: blur(${blurValue}px);
    \noutline: ${outlineValue}px solid ${colorValue};
    \nborder-radius: 10px;
    \nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`;

    // Mostrar el código CSS generado en el textarea
    cssResult.value = cssCode;
}

// Helper function para convertir HEX en RGB
function hexToRgb(hex) {
    const shorthandRegax = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegax, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, 
    ${parseInt(result[3], 16)}` : null;
}

// Añadir el event listener del botón "Copy To Clipboard"
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener('click', copyToClipboard);

function copyToClipboard() {
    const copyText = cssResult.value;
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Cambiar el texto del botón indicando que se ha copiado
    copyButton.textContent = "Copied!!";

    // Resetear el texto del botón después de un delay corto
    setTimeout(() => {
        copyButton.textContent = "Copy To Clipboard";
    }, 1000);
}