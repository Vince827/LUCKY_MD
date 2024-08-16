const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERKSllKdjJHdTFNa3I1d2VkajVoS3ZrbGZ1YzdrcFQ1UkNDY281dUdVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzlhRXcyYWk4OWY3a1IrZnByMWs0ZmhGbDhqSVFDRDZlOFJkL1dyc0JoOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQmhEd1N5NVJ0OGJMMEhKNDJubHFZc25aMVlMaXltYUpTNHVzbWZ4K0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxNDB0RENKTHRPVU1HSks1c0RxeXdKYnR0dUFhWWtoWVEvYmdKUkxaK1dVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhOL3VnbFBVUWNkZTBhVE5YaC92cXdyYnNOQVlJelBJeStKMHMyeFpRRVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1COHJSZzRkUElYdW5WNVhQOUc5dElCSUpMYzlOYjdIbnpnZFV5OTlpRDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkNER1VoNGcvRWxqR3JUek14aEJIcUwwcFpsdFZaMW56czhZU1pRMTNuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid29ZUW9kZnptVExzeXlJZExlRHV6eTZ6bmRaaHp2ZURtMUV5NWloZFVqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlE3bERMQ0t4bElXS0dyQ2RhckVBbXVkc2ZxbkNkSHp6aEdkZlFqUndrSThKelpmVjhXTXMxQVd1ajJKVXpwdk43Skl3SmxNQmdSS2dKRjNHSkZDVkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IlJNdFMxMW9oaXp4K2EzbU0rQzBPRWJQYTJYNjczY1YrMGVqR0ZNSUFPRkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InhsMUFDMElUUmtlSmhsTmNxODhBUkEiLCJwaG9uZUlkIjoiZmRjNTEyMTMtNjNmZS00OWQ2LTk2MTAtOTA0YmJhZjVmOTQxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhOMCs2a0J5bGx1UitSU2toWUpjdjd3by9Maz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibURiclEzL3Z0bmNwT25FMk9oZy9SM3VpcTVVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTC9lb3JzQ0VPZWQvN1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNVB4RUx2Rkg0Q1FuZWNmY2RVQzdJWnhpeFNjYTNLVDBPWWIrVmJRYlBSTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidVpmditzdzRPblk5M1VrMGpGYzFJeW1Va3dTQTRRNEUyRCtCRkhydnRTQTdxM0lLSkZ4MmxELy85VGFJeUxwY0RlSStTcjgrd0RPS1o4bzByRFM2Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6IlNBOTZpN0dTYVA5QjUyRnZTUmRiS0VaR0lyYWxLaTBlc2VSRmhtTU9LSC9WVkJMaG9GS1ZoaGJQTjkyc0swdzVsNVhmTkRxallReS85bnljTHFsTkJRPT0ifSwibWUiOnsiaWQiOiIyMzQ4MDY5OTE4MDk2OjQ4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Imp1c3QgdmluY2UifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA2OTkxODA5Njo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlVDhSQzd4UitBa0ozbkgzSFZBdXlHY1lzVW5HdHlrOURtRy9sVzBHejBUIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzODQ2Mzg3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUluMSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredie Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255620814108,255764182801,255686745716",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/60cd0a18bda777a41ffe3.jpg,https://telegra.ph/file/bc9bf76f258c98877d993.jpg,https://telegra.ph/file/f6c60977ceb194e05e616.jpg,https://telegra.ph/file/74d7f0176b4e779dea4fd.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
