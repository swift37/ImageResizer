const uploadContainer = document.querySelector('.upload-container')
const imagePreview = document.querySelector('.upload-container img')
const imageInput = document.querySelector('.upload-container input')
const downloadBtn = document.querySelector('.download-button')
const widthInput = document.getElementById('width')
const heightInput = document.getElementById('height')
const ratioCheck = document.getElementById('ratio')
const qualityCheck = document.getElementById('quality')

uploadContainer.addEventListener('click', () => imageInput.click())

let originalImgRatio

const loadImage = e => {
	const image = e.target.files[0]
	if (!image) return
	imagePreview.src = URL.createObjectURL(image)
	imagePreview.addEventListener('load', () => {
		document.querySelector('.wrapper').classList.add('active')
		widthInput.value = imagePreview.naturalWidth
		heightInput.value = imagePreview.naturalHeight
		originalImgRatio = imagePreview.naturalWidth / imagePreview.naturalHeight
	})
}

widthInput.addEventListener('keyup', () => {
	const height = ratioCheck.checked
		? widthInput.value / originalImgRatio
		: heightInput.value
	heightInput.value = Math.floor(height)
})

heightInput.addEventListener('keyup', () => {
	const width = ratioCheck.checked
		? heightInput.value / originalImgRatio
		: widthInput.value
	widthInput.value = Math.floor(width)
})

imageInput.addEventListener('change', loadImage)

const customizeAndDownload = () => {
	const canvas = document.createElement('canvas')
	const downloadLink = document.createElement('a')
	const ctx = canvas.getContext('2d')
	const imgQuality = qualityCheck.checked ? 0.7 : 1.0

	canvas.width = widthInput.value
	canvas.height = heightInput.value
	ctx.drawImage(imagePreview, 0, 0, canvas.width, canvas.height)

	downloadLink.href = canvas.toDataURL('image/jpeg', imgQuality)
	downloadLink.download = new Date().getTime()
	downloadLink.click()
}

downloadBtn.addEventListener('click', customizeAndDownload)
