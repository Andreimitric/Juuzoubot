/*
  Send a user a link to their avatar
*/

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
const client = new Discord.Client();
const hook = new Discord.WebhookClient('webhook id', 'webhook token')
const prefix = '$'

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'token';
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  console.log(command);

  let args = message.content.split(' ').slice(1);

  if (command === 'say') {
    message.delete(args.join(' '));
    message.channel.sendMessage(args.join(' '));
  }

  if (command === 'add') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
  }

  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.sendMessage('Pong');
  }


  if (message.content.startsWith(prefix + 'help')) {
    message.channel.sendMessage('```FUN: $ping, $thuglife, $wtf  \n USER: $avatar \n SAY: $say "message \n CALCULATOR: $add [example: $add 5 3  result: 8] \n INFO: $developer \n BOT INVITE: $invite```')
  }
})

bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + 'avatar')) {
    // send the user's avatar URL
    message.channel.sendMessage(message.author.avatarURL);
  }




  if (message.content.startsWith(prefix + 'invite')) {
    message.channel.sendMessage("https://discordapp.com/oauth2/authorize?client_id=307496247365992448&scope=bot&permissions=1074248768")
  }




  if (message.content.startsWith(prefix + 'developer')) {
    message.channel.sendMessage("```My developer: <@!277147576946524161> \n I'm using JavaScript discord.js \n Visit my GitHub page: https://github.com/Andreimitric/Juuzoubot```")
  }




  if (message.content.startsWith(prefix + 'thuglife')) {
    message.channel.sendMessage('https://66.media.tumblr.com/651ff940cd2781012358451fd66578f0/tumblr_njb6sg1Nls1sqi9jto1_500.gif')
  }




  if (message.content.startsWith(prefix + 'wtf')) {
    message.channel.sendMessage('https://s-media-cache-ak0.pinimg.com/originals/83/9a/56/839a56524f7344743543fb3141fa3901.gif')
  }
})


// log our bot in
bot.login(token);
