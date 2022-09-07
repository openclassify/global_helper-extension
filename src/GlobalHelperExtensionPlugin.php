<?php namespace Visiosoft\GlobalHelperExtension;

use Anomaly\Streams\Platform\Addon\Plugin\Plugin;

class GlobalHelperExtensionPlugin extends Plugin{

    public function getFunctions(): array
    {
        return [
            new \Twig_SimpleFunction(
                'is_module_enabled',
                function ($type,$slug) {
                    return app(GlobalHelperExtension::class)->is_enabled('module',$slug);
                }
            ),
            new \Twig_SimpleFunction(
                'is_extension_enabled',
                function ($type,$slug) {
                    return app(GlobalHelperExtension::class)->is_enabled('extension',$slug);
                }
            ),new \Twig_SimpleFunction(
                'isActive',
                function ($slug) {
                    return app(GlobalHelperExtension::class)->is_enabled('module',$slug);
                }
            )
        ];
    }
}