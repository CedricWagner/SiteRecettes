<?php

declare(strict_types=1);

namespace Drupal\admin_tweaks\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\NumberWidget;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Defines the 'admin_tweaks_duration_selector' field widget.
 *
 * @FieldWidget(
 *   id = "admin_tweaks_duration_selector",
 *   label = @Translation("Duration Selector"),
 *   field_types = {"integer"},
 * )
 */
final class DurationSelectorWidget extends NumberWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state): array {
    $duration = $items[$delta]->value ?? NULL;
    $nbHours = $duration ? floor($duration / 60) : NULL;
    $nbMinutes = $duration ? ($duration % 60) : NULL;

    $hoursSelector = [
      '#type' => 'number',
      '#default_value' => $nbHours,
      '#field_suffix' => $this->t('heures'),
    ];
    
    $minutesSelector = [
      '#type' => 'number',
      '#default_value' => $nbMinutes,
      '#field_suffix' => $this->t('minutes'),
    ];

    $elements = $element +
    [
      'hours_value' => $hoursSelector,  
      'minutes_value' => $minutesSelector,  
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function errorElement(array $element, ConstraintViolationInterface $violation, array $form, FormStateInterface $form_state) {
    return $element['minutes_value'];
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    
    foreach ($values as $key => $value) {
      if ($value['hours_value'] === '' && $value['minutes_value'] === '') {
        $values[$key]['value'] = NULL;
      }
      else {
        $nbHours = $value['hours_value'] !== '' ? intval($value['hours_value']) : 0;
        $nbMinutes = $value['minutes_value'] !== '' ? intval($value['minutes_value']) : 0;
        $values[$key]['value'] = ($nbHours * 60) + $nbMinutes;
      }
      
    }
    
    return $values;
  }

}
