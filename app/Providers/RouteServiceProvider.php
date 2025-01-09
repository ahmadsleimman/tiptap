<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register routes for the API
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Register routes for web
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}