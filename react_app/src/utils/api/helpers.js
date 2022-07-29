/** 
 * Parse the uri returned by drupal into a relative url
 * 
 * @param string linkAttribute
 * @return string
 */
 export function parseMenuLink(linkAttribute) {
    return linkAttribute.uri.replace('internal:', '');
}