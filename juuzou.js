/*
  Send a user a link to their avatar
*/

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
const client = new Discord.Client();
const fs = require('fs');
const hook = new Discord.WebhookClient('webhook id', 'webhook token')
const config = require("./config.json")
const embed = new Discord.RichEmbed()
const yt = require('ytdl-core');
const { Client } = require('discord.js');


let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.

let queue = {};

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
bot.on("debug", (e) => console.info(e));

bot.on("ready", () => {
  console.log('Ready')
    bot.user.setGame("$help");
});


bot.on('message', message => {

  var color = [
    "#FAEBD7",
    "#FF000",
    "#00FFFF",
    "#0000FF",
    "#8A2BE2",
    "#7FFF00",
    "#DC143C",
    "#FF8C00",
    "#FF1493",
    "#00BFFF",
    "#FFD700",
    "#FF0000",
    "#9ACD32",
    "#4E443A",
    "#AB3C00",
    "#FF6347",
    "#599F5A",
    "#49899A"
  ]

  var randomColor = color[Math.floor(Math.random() * color.length)];


  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.15 * Math.sqrt(userData.points));
  let curPoints = userData.points
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`You"ve leveled up to level **${curLevel}**! Good job!!!`);
  }

  if (message.content.startsWith('$level')) {
    message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`)
  }
  fs.writeFile('./points.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });



    if (userData.level === 0) {
      medal = ":reminder_ribbon:"
    }
    if (userData.level === 1) {
      medal = ":medal:"
    }
    if (userData.level === 2) {
      medal = ":military_medal:"
    }
    if (userData.level === 3) {
      medal = ":ticket:"
    }
    if (userData.level === 4) {
      medal = ":tickets:"
    }
    if (userData.level === 5) {
      medal = ":rosette:"
    }
    if (userData.level === 6) {
      medal = ":trophy:"
    }
    if (userData.level === 7) {
      medal = ":performing_arts:"
    }
    if (userData.level === 8) {
      medal = ":euro:"
    }
    if (userData.level >= 9) {
      medal = ":gem:"
    }

    if (userData.level === 0) {
      vipTier = 'Bronze'
      userData.points += 1
    }
    if (userData.level === 1) {
      vipTier = 'Bronze'
      userData.points += 1
    }
    if (userData.level === 2) {
      vipTier = 'Bronze'
      userData.points += 1
    }
    if (userData.level === 3) {
      vipTier = 'Bronze'
      userData.points += 1
    }
    if (userData.level === 4) {
      vipTier = 'Bronze'
      userData.points += 1
    }
    if (userData.level === 5) {
      vipTier = 'Silver'
      userData.points += 2
    }
    if (userData.level === 6) {
      vipTier = 'Silver'
      userData.points += 2
    }
    if (userData.level === 7) {
      vipTier = 'Silver'
      userData.points += 2
    }
    if (userData.level === 8) {
      vipTier = 'Silver'
      userData.points += 2
    }
    if (userData.level === 9) {
      vipTier = 'Emerald'
      userData.points += 4
    }
    if (userData.level === 10) {
      vipTier = 'Emerald'
      userData.points += 4
    }
    if (userData.level === 11) {
      vipTier = 'Emerald'
      userData.points += 4
    }
    if (userData.level === 12) {
      vipTier = 'Emerald'
      userData.points += 4
    }
    if (userData.level === 13) {
      vipTier = 'Emerald'
      userData.points += 4
    }
    if (userData.level === 14) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level === 15) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level === 16) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level === 17) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level === 18) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level === 19) {
      vipTier = 'Diamond'
      userData.points += 5
    }
    if (userData.level >= 20) {
      vipTier = ':gem: Black Diamond :gem:'
      userData.points += 6
    }



  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(' ').slice(1);


  if (command === "play") {
    if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${config.prefix}add`);
    if (queue[message.guild.id].playing) return message.channel.sendMessage('Already Playing');
    let dispatcher;
    queue[message.guild.id].playing = true;

    console.log(queue);
    (function play(song) {
      console.log(song);
      if (song === undefined) return message.channel.sendMessage('Queue is empty').then(() => {
        queue[message.guild.id].playing = false;
        message.member.voiceChannel.leave();
      });
      message.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
      dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : config.passes });
      let collector = message.channel.createCollector(m => m);
      collector.on('message', m => {
        if (m.content.startsWith(config.prefix + 'pause')) {
          message.channel.sendMessage('paused').then(() => {dispatcher.pause();});
        } else if (m.content.startsWith(config.prefix + 'resume')){
          message.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
        } else if (m.content.startsWith(config.prefix + 'skip')){
          message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
        } else if (m.content.startsWith('volume+')){
          if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith('volume-')){
          if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith(config.prefix + 'time')){
          message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
        }
      });
      dispatcher.on('end', () => {
        collector.stop();
        play(queue[message.guild.id].songs.shift());
      });
      dispatcher.on('error', (err) => {
        return message.channel.sendMessage('error: ' + err).then(() => {
          collector.stop();
          play(queue[message.guild.id].songs.shift());
        });
      });
    })(queue[message.guild.id].songs.shift());
  }
  if (command === 'join') {
    return new Promise((resolve, reject) => {
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
      voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  }
  if (command === 'add') {
    let url = message.content.split(' ')[1];
    if (url == '' || url === undefined) return message.channel.sendMessage(`You must add a YouTube video url, or id after ${config.prefix}add`);
    yt.getInfo(url, (err, info) => {
      if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
      if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
      queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
      message.channel.sendMessage(`added **${info.title}** to the queue`);
    });
  }
  if (command === 'queue') {
    if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${config.prefix}add`);
    let tosend = [];
    queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
    message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
  }
  if (command === 'music') {
    let tosend = ['```xl', config.prefix + 'join : "Join Voice channel of msg sender"',	config.prefix + 'add : "Add a valid youtube link to the queue"', config.prefix + 'queue : "Shows the current queue, up to 15 songs shown."', config.prefix + 'play : "Play the music queue if already joined to a voice channel"', '', 'the following commands only function while the play command is running:'.toUpperCase(), config.prefix + 'pause : "pauses the music"',	config.prefix + 'resume : "resumes the music"', config.prefix + 'skip : "skips the playing song"', config.prefix + 'time : "Shows the playtime of the song."',	'volume+(+++) : "increases volume by 2%/+"',	'volume-(---) : "decreases volume by 2%/-"',	'```'];
    message.channel.sendMessage(tosend.join('\n'));
  }
  if (command === 'reboot') {
    if (message.author.id == config.adminID) process.exit(); //Requires a node module like Forever to work.
  }

  if (userData.level === 0) {
    medal = ":reminder_ribbon:"
  }
  if (userData.level === 1) {
    medal = ":medal:"
  }
  if (userData.level === 2) {
    medal = ":military_medal:"
  }
  if (userData.level === 3) {
    medal = ":ticket:"
  }
  if (userData.level === 4) {
    medal = ":tickets:"
  }
  if (userData.level === 5) {
    medal = ":rosette:"
  }
  if (userData.level === 6) {
    medal = ":trophy:"
  }
  if (userData.level === 7) {
    medal = ":performing_arts:"
  }
  if (userData.level === 8) {
    medal = ":euro:"
  }
  if (userData.level >= 9) {
    medal = ":gem:"
  }

  if (userData.level === 0) {
    vipTier = 'Bronze'
    userData.points += 1
  }
  if (userData.level === 1) {
    vipTier = 'Bronze'
    userData.points += 1
  }
  if (userData.level === 2) {
    vipTier = 'Bronze'
    userData.points += 1
  }
  if (userData.level === 3) {
    vipTier = 'Bronze'
    userData.points += 1
  }
  if (userData.level === 4) {
    vipTier = 'Bronze'
    userData.points += 1
  }
  if (userData.level === 5) {
    vipTier = 'Silver'
    userData.points += 2
  }
  if (userData.level === 6) {
    vipTier = 'Silver'
    userData.points += 2
  }
  if (userData.level === 7) {
    vipTier = 'Silver'
    userData.points += 2
  }
  if (userData.level === 8) {
    vipTier = 'Silver'
    userData.points += 2
  }
  if (userData.level === 9) {
    vipTier = 'Emerald'
    userData.points += 4
  }
  if (userData.level === 10) {
    vipTier = 'Emerald'
    userData.points += 4
  }
  if (userData.level === 11) {
    vipTier = 'Emerald'
    userData.points += 4
  }
  if (userData.level === 12) {
    vipTier = 'Emerald'
    userData.points += 4
  }
  if (userData.level === 13) {
    vipTier = 'Emerald'
    userData.points += 4
  }
  if (userData.level === 14) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level === 15) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level === 16) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level === 17) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level === 18) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level === 19) {
    vipTier = 'Diamond'
    userData.points += 5
  }
  if (userData.level >= 20) {
    vipTier = ':gem: Black Diamond :gem:'
    userData.points += 6
  }


  if (command === 'lvlRestart') {
    if(message.author.id === config.adminID) {
    userData.level = 0
        userData.points = 0
    message.channel.sendMessage('Level restart successfully!')
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
    })} else {
      message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }

  if (command === 'setPoints') {
if(message.author.id === config.adminID) {
{
  userData.points = args.join(' ')
      message.channel.sendMessage('Points set to **' + args.join(' ') + '**')
    }
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
    })} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }

  if (command === 'setLevel') {
if(message.author.id === config.adminID) {
{
  userData.level = args.join(' ')
      message.channel.sendMessage('Level set to **' + args.join(' ') + '**')
    }
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
    })} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }

  if (command === 'lvl') {
if(message.author.id !== config.gf) return;
{
  userData.level = args.join(' ')
      message.channel.sendMessage('Level set to **' + args.join(' ') + '**')
    }
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
  }

  if (command === 'updateUSERDATA') {
if(message.author.id === config.adminID) {
    fs.writeFile('./points.json', JSON.stringify(points), (err) => {
      if (err) console.error(err)
      message.channel.sendMessage('User data files was updated successfully!')
      if (err) {
        message.channel.sendMessage('Update failed, please verify points file!')
      }
    })} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }

  if (command === 'setStatus') {
    if(message.author.id === config.adminID) {
    if (args.join('')) {
      bot.user.setStatus(args.join());
      message.channel.sendMessage("I'm " + args.join('') + " now!")
    }} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }

  if (command === 'setGame') {
    if(message.author.id === config.adminID) {
    if (args.join('')) {
      bot.user.setGame(args.join(''));
      message.channel.sendMessage('Game set to **' + args.join('') + '**')
    }} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }



  if (command === 'profile') {
      const embed = new Discord.RichEmbed()
        .setAuthor('' + message.author.username, '' + message.author.avatarURL)
        .setColor(randomColor)
        .setThumbnail('' + message.author.avatarURL)
        .setTimestamp()
        .addField('Level',
          '' + userData.level)
        .addField('Points', '' + userData.points, true)
        .addField('Achievements:', '' + medal, true)
        .addField('VIP Tier', '' + vipTier, true)
        message.channel.send({embed});
  }

  if (command === 'vip') {
    const embed = new Discord.RichEmbed()
      .setColor(randomColor)
      .setTimestamp()
      .addField('VIP Bronze', 'Points x1', true)
      .addField('VIP Silver', 'Points x2', true)
      .addField('VIP Gold', 'Points x3', true)
      .addField('VIP Emerald', 'Points x4', true)
      .addField('VIP Diamond', 'Points x5', true)
      .addField('VIP Black Diamond', 'Points x6', true)
      .addField('Current VIP Tier', '' + vipTier, true)
      message.channel.send({embed});
  }


  if (command === 'say') {
    message.delete(args.join(' '));
    message.channel.sendMessage(args.join(' '));
  }

  if (command === 'add+') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
  }

  if (command === 'reduce') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(total);
  }

  if (command === 'multiplied') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(total);
  }

  if (command === 'divided') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(total);
  }

  if (command === 'hug') {
        let target = message.mentions.users.first()
        if (target === message.author) {
          message.channel.sendMessage('Forever alone? :c Sad..')
        }
        else if (target) {
          message.channel.sendMessage('https://m.popkey.co/fca5d5/bXDgV.gif' + '\n' + '**' + target + '** you got a hug from **' + message.author.username + '**')
        } else {
          message.channel.sendMessage('You need to mention a person!')
        }
  }

  if (command === 'kill') {
        let target = message.mentions.users.first()
        if (target === message.author) {
          message.channel.sendMessage('Suicide? Ok..' + '\n' + 'https://i.redd.it/rj92xyc97r3y.gif')
        }
        else if (target) {
          message.channel.sendMessage('https://media.giphy.com/media/d8FJ7Fqef3o2c/giphy.gif?response_id=591f0443de6f9fbd47112b40' + '\n' + '**' + target + '** was killed by **' + message.author.username + '**')
        } else {
          message.channel.sendMessage('You need to mention a person!')
        }
  }


  if (command === 'status') {
    const embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setAuthor('Juuzou BOT', 'https://cdn.discordapp.com/avatars/307496247365992448/8adee49706d7537af31376f7b137b415.jpg?size=1024')
  .addField('Live bot statistics', `**Channels:** ${bot.channels.size} \n**Servers:** ${bot.guilds.size} \n**Total users:**  ${bot.users.size}`);
  message.channel.send({embed});
  }

  if (command === 'ping') {
    var start = Date.now();
    var end = Date.now();
    var diff = end - start;
      message.channel.sendEmbed({ color: 3447003,
    description: ':ping_pong: Pong! Your ping is ``' + diff + ' ms ``'});
  }


  if (command === 'avatar') {
        let target = message.mentions.users.first()
    if (target) {
      const embed = new Discord.RichEmbed()
        .setColor(randomColor)
        .setImage('' + target.avatarURL)
        message.channel.send({embed});
      } else if (args.join('')) {
        message.channel.sendMessage('Use command $avatar with no arguments or $avatar and mention a user')
      } else {
        const embed = new Discord.RichEmbed()
          .setColor(randomColor)
          .setImage('' + message.author.avatarURL)
          message.channel.send({embed});
      }
  }

  if (command === 'findID') {
    if(message.author.id === config.adminID) {
    let target = message.mentions.users.first()
    if (target) {
      message.channel.sendMessage(target.id)
    } else if (args.join('')) {
      message.channel.sendMessage('Use command $findID with no arguments or use $findID and mention a person!')
    } else {
      message.channel.sendMessage(message.author.id)
    }} else {
            message.reply('You are a fucking user, this command is only for bot developer!')
    }
  }


  if (command === "r_lol") {
    message.delete('r_lol')
      message.channel.sendMessage(":regional_indicator_l: :regional_indicator_o: :regional_indicator_l:")
  }

  if (command === "r_rekt") {
    message.delete('r_rekt')
      message.channel.sendMessage(":regional_indicator_r: :regional_indicator_e: :regional_indicator_k: :regional_indicator_t:")
  }

  if (command === "r_pro") {
    message.delete('r_pro')
      message.channel.sendMessage(":regional_indicator_p: :regional_indicator_r: :regional_indicator_o:")
  }

  if (command === "r_scandy") {
    message.delete('r_scandy')
      message.channel.sendMessage(":regional_indicator_s: :regional_indicator_u: :regional_indicator_c: :regional_indicator_k:    :regional_indicator_m: :regional_indicator_e:    :regional_indicator_i: :regional_indicator_m:    :regional_indicator_a:    :regional_indicator_c: :regional_indicator_a: :regional_indicator_n: :regional_indicator_d: :regional_indicator_y:")
  }


  if (command === "r_fucker") {
    message.delete('r_fucker')
      message.channel.sendMessage(":regional_indicator_f: :regional_indicator_u: :regional_indicator_c: :regional_indicator_k: :regional_indicator_e: :regional_indicator_r:")
  }

  if (command === "r_noob") {
    message.delete('r_noob')
      message.channel.sendMessage(":regional_indicator_n: :regional_indicator_o: :regional_indicator_o: :regional_indicator_b:")
  }


  if (command === 'invite') {
    message.channel.sendMessage("https://discordapp.com/oauth2/authorize?client_id=307496247365992448&scope=bot&permissions=3669056")
  }




  if (command === 'thuglife') {
    message.channel.sendMessage('https://66.media.tumblr.com/651ff940cd2781012358451fd66578f0/tumblr_njb6sg1Nls1sqi9jto1_500.gif')
  }



  if (command === 'wtf') {
    message.channel.sendMessage('https://s-media-cache-ak0.pinimg.com/originals/83/9a/56/839a56524f7344743543fb3141fa3901.gif')
  }

  if (command === 'help') {
    const embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setImage('https://cdn.discordapp.com/avatars/307496247365992448/8adee49706d7537af31376f7b137b415.jpg?size=1024')
  .setThumbnail('https://cdn.discordapp.com/avatars/307496247365992448/8adee49706d7537af31376f7b137b415.jpg?size=1024')
  .setTimestamp()
  .addField('About Juuzou BOT',
    '**Commands:** \nFUN: $thuglife, $wtf \nBOT STATUS: $status \nUSER: $vip, $profile, $ping, $avatar, $pin, $hug, $kill \nREACT: $r_rekt, $r_lol, $r_scandy, $r_fucker, $r_pro, $r_noob \nSAY: $say message \nCALCULATOR: $add+ [example: $add+ 5 3  result: 8], $reduce [example: $reduce 10 5 result: 5], $multiplied [example: $multiplied 5 5 result: 25], $divided [example: $divided 25 5 result: 5] \nBOT INVITE: $invite \nGAMES: $roulette, $slots \nMUSIC(beta): $music')
  .addField('Developer', '<@!277147576946524161> \n **Created in JavaScript discord.js**', true)
  .addField('Discord official server', 'https://discord.gg/xXGJB5e', true)
  .addField('Juuzou BOT beta version', ' If you have any problem to report or you want new command for bot please use official discord server', true)
  message.channel.send({embed});

  }

  if (command === 'pin') {
    if (args.join('')) {
    message.react('📌')
    message.pin()
      } else {
    message.channel.sendMessage('Write a message for pin!')
    }
  }

  // Roulette game

  if (command === 'roulette') {
    var prize = [
      "You win 1 points",
      "You lose 10 points",
      "You win 30 points",
      "You lose 100 points",
      "You win 500 points",
      "You lose 200 points",
      "You win 100 points",
      "You lose 250 points",
      "You win 2 points",
      "You lose 5 points",
      "You win 250 points",
      "Jackpot!!! You win 1000 points!",
      "You lose 80 points",
      "You win 222 points",
      "You lose 90 points",
      "You win 400 points",
      "You lose 500 points",
      "You win 350 points",
      "Unlucky.. your balance of points is 1!",
      "You lose 70 points"

    ]

    var randomPrize = prize[Math.floor(Math.random() * prize.length)];

    if (randomPrize === "You win 1 points") {
      userData.points += 1
    }

    if (randomPrize === "You lose 10 points") {
      userData.points -= 10
    }
    if (randomPrize === "You win 30 points") {
      userData.points += 30
    }
    if (randomPrize === "You lose 100 points") {
      userData.points -= 100
    }
    if (randomPrize === "You win 500 points") {
      userData.points += 500
    }
    if (randomPrize === "You lose 200 points") {
      userData.points -= 200
    }
    if (randomPrize === "You win 100 points") {
      userData.points += 100
    }
    if (randomPrize === "You lose 250 points") {
      userData.points -= 250
    }
    if (randomPrize === "You win 2 points") {
      userData.points += 2
    }
    if (randomPrize === "You lose 5 points") {
      userData.points -= 5
    }
    if (randomPrize === "You win 250 points") {
      userData.points += 250
    }
    if (randomPrize === "You lose 80 points") {
      userData.points -= 80
    }
    if (randomPrize === "You win 222 points") {
      userData.points += 222
    }
    if (randomPrize === "You lose 90 points") {
      userData.points -= 90
    }
    if (randomPrize === "You win 400 points") {
      userData.points += 400
    }
    if (randomPrize === "You lose 500 points") {
      userData.points -= 500
    }
    if (randomPrize === "You win 350 points") {
      userData.points += 350
    }
    if (randomPrize === "You lose 70 points") {
      userData.points -= 70
    }
    if (randomPrize === "Jackpot!!! You win 1000 points!") {
      userData.points += 1000
    }
    if (randomPrize === "Unlucky.. your balance of points is 1!") {
      userData.points = 1
    }

    if (userData.points <= 0) {
      message.channel.sendMessage("You don't have points, you are unable to play roulette!")
    } else {
      message.reply(randomPrize)
    }
  }




  //Slots game

    if (command === 'slots') {
      var prize = [
        "[:green_apple: :strawberry: :watermelon:] \n and lost... \n -10 points",
        "[:grapes: :apple: :apple:] \n and almost won (2/3) \n +15 points",
        "[:pineapple: :banana: :pear:] \n and lost... \n -10 points",
        "[:cherries: :melon: :avocado:] \n and lost... \n -10 points",
        "[:tangerine: :grapes: :peach:] \n and lost... \n -10 points",
        "[:cherries: :pineapple: :grapes:] \n and lost... \n -10 points",
        "[:cherries: :cherries: :melon:] \n and almost won (2/3) \n +15 points",
        "[:cherries: :cherries: :cherries:] \n and won!!!  :tada: \n +100 points",
        "[:green_apple: :lemon: :strawberry:] \n and lost... \n -10 points",
        "[:pear: :watermelon: :cherries:] \n and lost... \n -10 points",
        "[:banana: :tangerine: :pear:] \n and lost... \n -10 points",
        "[:banana: :pineapple: :pear:] \n and lost... \n -10 points",
        "[:melon: :melon: :apple:] \n and almost won (2/3) \n +15 points",
        "[:avocado: :cherries: :melon:] \n and lost... \n -10 points",
        "[:grapes: :tangerine: :peach:] \n and lost... \n -10 points",
        "[:strawberry: :cherries: :strawberry:] \n and almost won (2/3) \n +15 points",
        "[:green_apple: :pineapple: :watermelon:] \n and lost... \n -10 points",
        "[:pear: :watermelon: :cherries:] \n and lost... \n -10 points",
        "[:banana: :tangerine: :strawberry:] \n and lost... \n -10 points",
        "[:pineapple: :pineapple: :pineapple:] \n and won!!!  :tada: \n +100 points"
      ]


      var randomPrize = prize[Math.floor(Math.random() * prize.length)];



      if (randomPrize === "[:green_apple: :strawberry: :watermelon:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:grapes: :apple: :apple:] \n and almost won (2/3) \n +15 points") {
        userData.points += 15
      }
      if (randomPrize === "[:cherries: :melon: :avocado:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:tangerine: :grapes: :peach:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:cherries: :pineapple: :grapes:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:cherries: :cherries: :melon:] \n and almost won (2/3) \n +15 points") {
        userData.points += 15
      }
      if (randomPrize === "[:cherries: :cherries: :cherries:] \n and won!!!  :tada: \n +100 points") {
        userData.points += 100
      }
      if (randomPrize === "[:green_apple: :lemon: :strawberry:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:pear: :watermelon: :cherries:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:banana: :tangerine: :pear:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:banana: :pineapple: :pear:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:melon: :melon: :apple:] \n and almost won (2/3) \n +15 points") {
        userData.points += 15
      }
      if (randomPrize === "[:avocado: :cherries: :melon:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:grapes: :tangerine: :peach:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:strawberry: :cherries: :strawberry:] \n and almost won (2/3) \n +15 points") {
        userData.points += 15
      }
      if (randomPrize === "[:green_apple: :pineapple: :watermelon:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:pear: :watermelon: :cherries:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:banana: :tangerine: :strawberry:] \n and lost... \n -10 points") {
        userData.points -= 10
      }
      if (randomPrize === "[:pineapple: :pineapple: :pineapple:] \n and won!!!  :tada: \n +100 points") {
        userData.points += 100
      }

      if (userData.points <= 0) {
        message.channel.sendMessage("You don't have points, you are unable to play slots!")
      } else {
        message.channel.sendMessage(randomPrize)
      }


    }


});


// log our bot in
bot.login(config.token);
