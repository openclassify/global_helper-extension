<?php namespace Visiosoft\GlobalHelperExtension;

use Anomaly\Streams\Platform\Addon\Plugin\Plugin;

class GlobalHelperExtensionPlugin extends Plugin{

    public function getFunctions(): array
    {
        return [
            new \Twig\TwigFunction(
                'is_module_enabled',
                function ($slug) {
                    return is_module_installed($slug);
                }
            ),
            new \Twig\TwigFunction(
                'is_extension_enabled',
                function ($slug) {
                    return is_extension_installed($slug);
                }
            )
        ];
    }
}