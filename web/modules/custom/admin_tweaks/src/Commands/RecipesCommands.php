<?php

namespace Drupal\admin_tweaks\Commands;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drush\Commands\DrushCommands;

/**
 * RecipesCommands provides Drush commands
 */
class RecipesCommands extends DrushCommands {

  /**
   * RecipesCommands constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager service.
   */
  public function __construct(protected EntityTypeManagerInterface $entityTypeManager) {
  }

  /**
   * Save all recipes.
   *
   * @command recipes:save-all
   * @usage drush recipes:save-all
   * @aliases rsa
   */
  public function fkezfhelkfhzlfhzlefz() {

    $recipes = $this->entityTypeManager->getStorage('node')->loadByProperties([
      'type' => 'recipe'
    ]);

    foreach ($recipes as $recipe) {
      $recipe->save();
    }

    $this->output(t('@nb recipes have been saved.', [
      '@nb' => count($recipes)
    ]));

  }

}
