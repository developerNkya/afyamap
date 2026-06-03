<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('region');
            $table->string('category');
            $table->integer('safeCareLevel')->nullable();
            $table->boolean('jciAccredited')->default(false);
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('reviewCount')->default(0);
            $table->json('services')->nullable();
            $table->json('insurances')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('hours')->nullable();
            $table->string('established')->nullable();
            $table->string('beds')->nullable();
            $table->boolean('emergency247')->default(false);
            $table->json('languages')->nullable();
            $table->text('description')->nullable();
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
