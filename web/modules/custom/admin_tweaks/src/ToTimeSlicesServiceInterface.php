<?php

namespace Drupal\admin_tweaks;

/**
 * Interface ToTimeSlicesServiceInterface.
 */
interface ToTimeSlicesServiceInterface {

    /**
     * 
     * 
     * 
     * @param int $min - the minimum value
     * @param int $max - the maximum value
     * @param int[] $slices - the target slices
     * 
     * @return array the slices corresponding to the min/max values
     */
    public function fromIntegerRange (int $min, int $max, array $slices) : array;

}
