const readline = require('readline');
const fs = require('fs');

module.exports = (markdownFile) => {
    const parseMarkdown = (line) => {
        let isPreformatted = false;
        let listLevel = 0;
        let match;
        let markup = "";

        /* Is Heading */
        if(match = line.match(/^#* /)) {
            if (listLevel !== 0 || isPreformatted) {
                //close list or don't parse markdown
            }
            else {
                let heading = match[0].length;

                if(heading > 0 && heading < 7) {
                    markup += "<h" + heading + ">";
                }
            }
        }

        /* Is Horizontal Rule */

        /*  */

        /* Paragraph */
            //Parse Text Attributes
    };

    return new Promise((reject, resolve) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(markdownFile),
            crlfDelay: Infinity
        });

        let html = "";

        rl.on('line', (line) => {
            html += parseMarkdown(line);
        }).on('close', () => {
            resolve(html)
        });
    });
};

/*
* Markup to Support:
Heading
=======

## Sub-heading

Paragraphs are separated
by a blank line.

Two spaces at the end of a line
produces a line break.

Text attributes _italic_,
**bold**, `monospace`.

Horizontal rule:

---

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. wash
  2. rinse
  3. repeat

A [link](http://example.com).

![Image](Image_icon.png)

> Markdown uses email-style > characters for blockquoting.

Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.
* */