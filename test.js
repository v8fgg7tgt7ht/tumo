// import express from 'express'
// const app = express()

// //app.use(express.static('.'))


// app.get("/name/search", function (req, res) {
//     let srch = req.params.srch;
//     res.redirect('http://google.com/search?q=' + srch)
// });

// app.get("/google", function (req, res) {

//     res.redirect('http://google.com')
// });


// app.listen(3000, () => {
//     console.log('++++++');
// });
// let text = readFileSync('test.txt',)
// console.log(text)

// appendFileSync





import { readFileSync, writeFileSync, appendFileSync, readFile } from 'fs'
writeFileSync('test.txt', 'other icons and instant messenger  (usually the term is kook used when on mobile devices)Text messages are \nused messages for personal, family, business and social purposes.Governmental and non - governmental organizations use text messaging for communication between colleagues.In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earl\nier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate(e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e - mail and voicemail and unlike calls(in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals.Text messages can also be used to interact with automated systems, for example, to order products or services from e - commerce websites, or to participate in online contests.Advertisers and service providers use direct text marketing to send me\nssages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email')


let word = 'applications'
let str = readFileSync('test.txt', 'utf8')
let reg = new RegExp(word, 'g')
let res = str.match(reg)
console.log(res.length);




