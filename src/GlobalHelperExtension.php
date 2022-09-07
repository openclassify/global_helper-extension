<?php namespace Visiosoft\GlobalHelperExtension;

use Anomaly\Streams\Platform\Addon\Extension\Extension;

class GlobalHelperExtension extends Extension
{

    public function is_enabled($type,$slug)
    {
        if ($type==='module'){
            if ($addon = app('module.collection')->get('visiosoft.'. $type . '.' . $slug)) {
                return $addon->installed;
            }
            return false;
        }elseif ($type==='extension'){
            if ($addon = app('module.collection')->get('visiosoft.'.$type.'.'.$slug)) {
                return $addon->installed;
            }
            return false;
        }
    }

}
