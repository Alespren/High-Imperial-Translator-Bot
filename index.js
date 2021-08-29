require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')

const client = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
})

client.commands = new Discord.Collection()

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)

	client.commands.set(command.data.name, command)
}

client.on('ready', () => {
	console.log(chalk.green('Translator online!'))
})

client.on('messageCreate', async (message) => {
	// Admin command
	if (!client.application?.owner) await client.application?.fetch()

	// Delete all slash commands in guild
	// Register guild slash commands
	// Registers all commands to the current guild
	if (
		message.content.toLowerCase().startsWith('t!rgc') &&
		message.author.id == client.application?.owner.id
	) {
		client.commands.forEach((command) => {
			// Register guild command
			console.log(
				chalk.blue(`Registering ${command.data.name} for ${message.guild.name}`)
			)
			client.guilds.cache.get(message.guild.id)?.commands.create(command.data)
		})
	}
})

client.on('interactionCreate', (interaction) => {
	if (interaction.isCommand() == false) return
	const command = client.commands.get(interaction.commandName)

	try {
		command.run(interaction, client)
	} catch (e) {
		console.log(chalk.red(e))
	}
})

client.login(process.env.TOKEN)
