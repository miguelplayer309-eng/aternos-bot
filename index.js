const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { GoalNear } = goals

function startBot() {
  const bot = mineflayer.createBot({
    host: 'SilenttSMP.aternos.me',
    port: 19710,
    username: 'NPC_AFK',
    version: '1.21.1'
  })

  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    console.log('🤖 Bot entrou no servidor!')
    bot.chat('Olá! Estou mantendo o servidor ativo 😎')

    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
    bot.pathfinder.setMovements(defaultMove)

    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() - 0.5) * 2
      const z = bot.entity.position.z + (Math.random() - 0.5) * 2
      const y = bot.entity.position.y
      bot.pathfinder.setGoal(new GoalNear(x, y, z, 1))
    }, 15000) // anda a cada 15 segundos
  })

  bot.on('end', () => {
    console.log('Bot caiu, reconectando em 10 segundos...')
    setTimeout(startBot, 10000)
  })

  bot.on('error', err => console.log('Erro:', err.message))
}

startBot()
