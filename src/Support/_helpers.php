<?php

use Visiosoft\GlobalHelperExtension\Support\Command\CheckModuleInstalled;

if (!function_exists('is_module_installed'))
{
    function is_module_installed($moduleNamespace, $checkEnabled = true) {
        return dispatch_now(new CheckModuleInstalled($moduleNamespace, $checkEnabled));
    }
}