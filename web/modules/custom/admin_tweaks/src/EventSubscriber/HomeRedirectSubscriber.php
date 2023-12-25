<?php declare(strict_types = 1);

namespace Drupal\admin_tweaks\EventSubscriber;

use Drupal\Core\Path\CurrentPathStack;
use Drupal\Core\Path\PathMatcherInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * @todo Add description for this subscriber.
 */
final class HomeRedirectSubscriber implements EventSubscriberInterface {

  /**
   * Constructs a HomeRedirectSubscriber object.
   */
  public function __construct(
    private readonly CurrentPathStack $pathCurrent,
    private readonly PathMatcherInterface $pathMatcher,
    private readonly AccountProxyInterface $currentUser,
  ) {}

  /**
   * Kernel request event handler.
   */
  public function redirectFromHome(RequestEvent $event): void {
    if (!$this->pathMatcher->isFrontPage()) {
      return;
    }

    $redirectUrl = FALSE;
    if ($this->currentUser->isAnonymous()) {
      $redirectUrl = new Url('user.login');
    } else {
      $redirectUrl = new Url('system.admin_content');
    }

    $event->setResponse(new RedirectResponse($redirectUrl->toString()));
  }


  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::REQUEST => ['redirectFromHome']
    ];
  }

}
