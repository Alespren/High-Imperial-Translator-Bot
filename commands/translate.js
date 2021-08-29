const translate = require('../utils/translateText')

module.exports = {
	data: {
		name: 'translate',
		description: 'Translate any text into High Imperial',
		options: [
			{
				name: 'text',
				description: 'The text you wish to translate',
				required: true,
				type: 'STRING',
			},
		],
	},
	run(interaction) {
		const { options } = interaction
		let text = options.get('text').value
		text = translate(text)
		text = text.replace(/\s+/g, ' ').trim()

		interaction.reply({
			content: text,
		})
	},
}
