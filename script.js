const columns = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
	event.preventDefault()
	if (event.code === 'Space') {
		setRandomColors()
	}
})

document.addEventListener('click', event => {
	const type = event.target.dataset.type

	if (type === 'lock') {
		const node =
			event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClick(event.target.textContent)
	}
})

const generateRandomColor = () => {
	const hexCodes = '0123456789abcdef'

	let color = ''

	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}

	return `#${color}`
}

const setRandomColors = isInitial => {
	const colors = isInitial ? getColorsFromHash() : []

	columns.forEach((item, index) => {
		const isLocked = item.querySelector('i').classList.contains('fa-lock')

		const text = item.querySelector('h2')
		const button = item.querySelector('button')

		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random()

		if (!isInitial) {
			colors.push(color)
		}

		text.textContent = color
		item.style.background = color

		setTextColor(text, color)
		setTextColor(button, color)
	})

	updateColorsHash(colors)
}

const setTextColor = (text, color) => {
	const luminance = chroma(color).luminance()

	text.style.color = luminance > 0.5 ? 'teal' : 'papayawhip'
}

const copyToClick = text => {
	return navigator.clipboard.writeText(text)
}

const updateColorsHash = (colors = []) => {
	document.location.hash = colors
		.map(item => {
			return item.toString().substring(1)
		})
		.join('-')
}

const getColorsFromHash = () => {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => `#${color}`)
	}
	return []
}

setRandomColors(true)
