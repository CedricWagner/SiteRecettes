<?php

namespace Drupal\admin_tweaks;

/**
 * Class ToTimeSlicesService.
 */
class ToTimeSlicesService implements ToTimeSlicesServiceInterface {

  /**
   * Constructs a new ToTimeSlicesService object.
   */
  public function __construct() {

  }

  /**
   * @inheritdoc
   */
  public function fromIntegerRange (int $min, int $max, array $slices) : array {
    $targetSlices = [];

    foreach ($slices as $key => $value) {
      if ($min <= $key) {
        $targetSlices[$key] = $value;
      }
    }

    return $targetSlices;
  }

}
