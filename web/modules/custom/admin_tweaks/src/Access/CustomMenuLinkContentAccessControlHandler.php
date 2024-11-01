<?php

namespace Drupal\admin_tweaks\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\menu_link_content\MenuLinkContentAccessControlHandler;

/**
 * Defines the access control handler for the menu link content entity type.
 */
class CustomMenuLinkContentAccessControlHandler extends MenuLinkContentAccessControlHandler  {

    /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    switch ($operation) {
        case 'view':
            return AccessResult::allowedIfHasPermission($account, 'access menu items');

        default:
            return parent::checkAccess($entity, $operation, $account);
    }
  }

}
