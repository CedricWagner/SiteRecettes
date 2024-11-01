<?php

namespace Drupal\units\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;

/**
 * Provides an interface for defining Unit entities.
 *
 * @ingroup units
 */
interface UnitInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Unit name.
   *
   * @return string
   *   Name of the Unit.
   */
  public function getName();

  /**
   * Sets the Unit name.
   *
   * @param string $name
   *   The Unit name.
   *
   * @return \Drupal\units\Entity\UnitInterface
   *   The called Unit entity.
   */
  public function setName($name);

  /**
   * Gets the Unit creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Unit.
   */
  public function getCreatedTime();

  /**
   * Sets the Unit creation timestamp.
   *
   * @param int $timestamp
   *   The Unit creation timestamp.
   *
   * @return \Drupal\units\Entity\UnitInterface
   *   The called Unit entity.
   */
  public function setCreatedTime($timestamp);

}
