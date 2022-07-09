jQuery(() => {
    // adapt multiselects size according to its number of options
    const maxSize = 20
    jQuery('select[multiple="multiple"]').each((index, select) => {
        const count = jQuery(select).find('option').length

        jQuery(select).attr('size', count >= maxSize ? maxSize : count)
    });
 });