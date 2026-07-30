<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Replace Microsoft (azure_id) with Google OAuth (google_id).
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'azure_id') && !Schema::hasColumn('users', 'google_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique(['azure_id']);
            });

            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('azure_id', 'google_id');
            });

            Schema::table('users', function (Blueprint $table) {
                $table->unique('google_id');
            });

            return;
        }

        if (!Schema::hasColumn('users', 'google_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('google_id', 255)->nullable()->unique()->after('id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'google_id') && !Schema::hasColumn('users', 'azure_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique(['google_id']);
            });

            Schema::table('users', function (Blueprint $table) {
                $table->renameColumn('google_id', 'azure_id');
            });

            Schema::table('users', function (Blueprint $table) {
                $table->unique('azure_id');
            });
        }
    }
};
