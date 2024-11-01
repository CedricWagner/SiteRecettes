<?php

namespace Drupal\units\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityPublishedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Unit entity.
 *
 * @ingroup units
 *
 * @ContentEntityType(
 *   id = "unit",
 *   label = @Translation("Unit"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\units\UnitListBuilder",
 *     "views_data" = "Drupal\units\Entity\UnitViewsData",
 *     "translation" = "Drupal\units\UnitTranslationHandler",
 *
 *     "form" = {
 *       "default" = "Drupal\units\Form\UnitForm",
 *       "add" = "Drupal\units\Form\UnitForm",
 *       "edit" = "Drupal\units\Form\UnitForm",
 *       "delete" = "Drupal\units\Form\UnitDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\units\UnitHtmlRouteProvider",
 *     },
 *     "access" = "Drupal\units\UnitAccessControlHandler",
 *   },
 *   base_table = "unit",
 *   data_table = "unit_field_data",
 *   translatable = TRUE,
 *   admin_permission = "administer unit entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *     "published" = "status",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/unit/{unit}",
 *     "add-form" = "/admin/structure/unit/add",
 *     "edit-form" = "/admin/structure/unit/{unit}/edit",
 *     "delete-form" = "/admin/structure/unit/{unit}/delete",
 *     "collection" = "/admin/structure/unit",
 *   },
 *   field_ui_base_route = "unit.settings"
 * )
 */
class Unit extends ContentEntityBase implements UnitInterface {

  use EntityChangedTrait;
  use EntityPublishedTrait;

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // Add the published field.
    $fields += static::publishedBaseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the Unit entity.'))
      ->setSettings([
        'max_length' => 50,
        'text_processing' => 0,
      ])
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['status']->setDescription(t('A boolean indicating whether the Unit is published.'))
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
        'weight' => -3,
      ]);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
