import { load } from 'cheerio'

// https://github.com/ttu/office-slack-bot

export class WebScraper {

    constructor(public options) {}

    async getText(siteId: string) {

        if (siteId === 'list')
            return this.getList()

        const opts = this.options[siteId]

        if (!opts) return `Available sites: ${Object.keys(this.options)}`;

        const result = await fetch(opts.url);
        const html = await result.text();
        const $ = load(html); // eslint-disable-line
        return eval(opts.selector); // eslint-disable-line no-eval

    }

    getList() {
        let text = '';
        for (const prop in this.options) {
            text += `${prop}: ${this.options[prop].description}\n`;
        }
        return text;
    }

}