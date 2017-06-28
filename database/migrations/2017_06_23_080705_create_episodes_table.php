<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->enum('type', ['episode', 'snack']);
            $table->integer('number');
            $table->string('title');
            $table->string('description');
            $table->date('release_date');
            $table->integer('file_size');
            $table->string('file_url');
            $table->string('file_duration');
            $table->string('transcript_url')->nullable()->default(null);
            $table->enum('category', ['interview', 'game-special', 'event-special'])->nullable()->default(null);
            $table->string('mask')->nullable()->default(null);
            $table->string('colour')->nullable()->default(null);
            $table->string('background')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('episodes');
    }
}
