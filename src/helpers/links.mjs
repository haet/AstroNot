/**
 * convert internal links in markdown to the correct url
 * 
 * detects links like [link text](/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX) and [link text](XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX) 
 * if the link matches a page id in the pages array, it replaces the link with the page url
 * @param {*} mdString 
 * @param {*} pages 
 * @returns 
 */
export function convertInternalLinks(mdString, pages) {
    // find all link url in markdown
    const links = mdString.match(/\[.*?\]\(.*?\)/g);
    if (!links) {
        return mdString;
    }
    links.forEach(link => {
        // find the page title in the link
        let title = link.match(/\[(.*?)\]/)[1];

        // find the page slug in the link
        const slug = link.match(/\((.*?)\)/)[1];
        let targetPageId = null;

        // skip external links
        if (slug.startsWith("http")) {
            return;
        }

        // inline links start with "/" and do not have "-" in the slug
        if (slug.startsWith("/") && slug.length === 33) {
            // remove the leading "/" from the slug and add "-" like XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
            targetPageId = slug.substring(1, 9) + "-" + slug.substring(9, 13) + "-" + slug.substring(13, 17) + "-" + slug.substring(17, 21) + "-" + slug.substring(21);
        }
        // block links are like XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX without the leading "/"
        else if (slug.length === 36) {
            targetPageId = slug;
        }

        // find the page id in the pages array
        const page = pages.find(page => page.id === targetPageId);
        // if the page exists, replace the link with the page url
        if (page) {
            // this seems to be a bug in the original code. Some links have the title "link_to_page"
            if (title === "link_to_page") {
                title = page.title;
            }
            mdString = mdString.replace(link, `[${title}](/posts/${page.slug})`);
        }
    });
    return mdString;
}
