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

            $table->increments('id')
                ->comment('Auto-incrementing ID');

            $table->boolean('active')
                ->default(false)
                ->comment('Boolean to show/hide the episode on the website and in data if true/false');

            $table->enum('type', ['episode', 'snack'])
                ->comment('Type of episode');

            $table->integer('number')
                ->comment('Episode number respective to its type');

            $table->string('title')
                ->comment('Title of the episode (without prefixed number or type text)');

            $table->string('description', 255)
                ->comment('Description of the episode');

            $table->date('release_date')
                ->comment('Release date of the episode');

            $table->integer('file_size')
                ->comment('File size of the episode in bytes');

            $table->string('file_url')
                ->comment('Absolute URL of the episode file');

            $table->string('file_duration')
                ->comment('Duration of the episode in HH:MM:SS format');

            $table->string('transcript_url')
                ->nullable()
                ->default(null)
                ->comment('Optional absolute URL of the episode transcript location/file');

            $table->enum('category', ['interview', 'game-special', 'event-special'])
                ->nullable()
                ->default(null)
                ->comment('Optional episode category');

            $table->string('mask')
                ->nullable()
                ->default(null)
                ->comment('Optional relative URL (from root of website) of the episode header menu mask image file');

            $table->string('colour')
                ->nullable()
                ->default(null)
                ->comment('Optional episode player background colour (in CSS-valid format)');

            $table->string('background')
                ->nullable()
                ->default(null)
                ->comment('Optional relative URL (from root of website) of the episode player background image file');

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
