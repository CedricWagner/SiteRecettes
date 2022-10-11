<?php

namespace Drupal\custom_serializers\Plugin\views\style;

use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\rest\Plugin\views\style\Serializer;
/**
 * Style plugin to format search results
 * 
 * @ingroup views_style_plugin
 * 
 * @ViewsStyle(
 *   id = "search_result_serializer",
 *   title = @Translation("Search result serializer"),
 *   help = @Translation("Serializes views row data using the Serializer
 *   component."), display_types = {"data"}
 * )
 */
class SearchResultSerializer extends Serializer {
    /**
     * {@inheritdoc}
     */
    public function render() {
        $rows = [];

        foreach ($this->view->result as $row) {
            $this->view->rowPlugin->render($row);
            
            $entity = $row->_entity;

            // apply image style
            $style = ImageStyle::load('card');
            $image_uri = $entity->field_image[0]->target_id ? File::load($entity->field_image[0]->target_id)->getFileUri() : null;

            $rows[] = [
                'title' => $entity->title->value,
                'field_path' => $entity->field_path->value,
                'field_image' => $image_uri ? $style->buildUrl($image_uri) : null,
                'field_categories' => array_map(function($item) {
                    $term = $item->entity;
                    return [
                        'name' => $term->name->value,
                        'id' => $term->uuid->value
                    ];
                }, $entity->field_categories ? iterator_to_array($entity->field_categories->getIterator()): [])
            ];
        }

        if ((empty($this->view->live_preview))) {
            $content_type = $this->displayHandler->getContentType();
        } else {
            $content_type = !empty($this->options['formats']) ? reset($this->options['formats']) : 'json';
        }

        return $this->serializer->serialize($rows, $content_type, ['views_style_plugin' => true]);
    }
}