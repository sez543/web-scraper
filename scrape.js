const puppeteer = require("puppeteer");
const request = require("request");
const fs = require("fs");

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    if (!err) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    }
  });
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://chitanka.info/books/category/fantastika.html/1");
  const finalPage = await page.evaluate(() => {
    const finalPage = document.querySelectorAll(
      ".pagination li:nth-last-child(2) a"
    );
    return finalPage[0].innerHTML;
  });

  for (var j = 1; j <= finalPage; j++) {
    await page.goto(
      "https://chitanka.info/books/category/fantastika.html/" + j
    );
    const info = await page.evaluate(() => {
      const links = document.querySelectorAll("[class*=fb2]");
      const Titles = document.querySelectorAll("i");
      const Category = document.querySelectorAll(".bookcat a");
      var books = [];
      for (var i = 0; i < links.length; i++) {
        books.push({
          title: Titles[i].innerHTML
            .replace(":", "")
            .replace("\\", "")
            .replace("/", "")
            .replace("?", ""),
          category: Category[i].innerHTML,
          link: links[i].href,
        });
      }
      return books;
    });
    //console.log(info);
    //console.log(info.length);

    /*
    for (var i = 0; i < info.length; i++) {
      if (!fs.existsSync("Downloads/" + info[i].category)) {
        fs.mkdirSync("Downloads/" + info[i].category);
      }
    }
    for (var i = 0; i < info.length; i++) {
      download(
        info[i].link,
        "Downloads/" + info[i].category + "/" + info[i].title + ".zip",
        function() {}
      );
    }
    console.log(j);
    */
  }

  console.log("Done");
  await browser.close();
})();
