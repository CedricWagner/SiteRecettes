<?php
namespace Drupal\Tests\admin_tweaks\Unit;

use Drupal\admin_tweaks\ToTimeSlicesService;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\Config;
use Drupal\Core\Form\FormState;
use Drupal\Core\StringTranslation\TranslationInterface;
use Drupal\savings_calculator\Form\SavingsCalculatorSettingsForm;
use Drupal\Tests\UnitTestCase;
use Drupal\Component\Assertion\Inspector;

/**
 * Test class for ToTimeSlicesService
 *
 */
class ToTimeSlicesServiceTest extends UnitTestCase {

    private ToTimeSlicesService $toTimeSlices;
    private array $sampleSlices;

    public function setUp(): void {
        parent::setUp();
        // Instantiate the code under test
        $this->toTimeSlices = new ToTimeSlicesService();
        $this->sampleSlices = [
            15 => '< 15',
            30 => '< 30',
            45 => '< 45',
        ];
    }

    public function testLowValue() {
        $this->assertSame(
            $this->toTimeSlices->fromIntegerRange(15, 20, $this->sampleSlices), 
            $this->sampleSlices
        );
    }

    public function testMediumValue() {
        $this->assertSame(
            $this->toTimeSlices->fromIntegerRange(30, 40, $this->sampleSlices), 
            [
                30 => '< 30',
                45 => '< 45',
            ]
        );
    }

    public function testHighValue() {
        $this->assertSame(
            $this->toTimeSlices->fromIntegerRange(50, 60, $this->sampleSlices), 
            []
        );
    }
}