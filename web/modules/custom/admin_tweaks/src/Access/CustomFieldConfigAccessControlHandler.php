<?php

namespace Drupal\admin_tweaks\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\field\FieldStorageConfigAccessControlHandler;

/**
 * Defines the access control handler for the menu link content entity type.
 */
class CustomFieldConfigAccessControlHandler extends FieldStorageConfigAccessControlHandler  {

    /**
     * {@inheritdoc}
     */
    protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
        switch ($operation) {
            case 'view':
                return AccessResult::allowedIfHasPermission($account, 'access field config');

            default:
                return parent::checkAccess($entity, $operation, $account);
        }
    }

}
