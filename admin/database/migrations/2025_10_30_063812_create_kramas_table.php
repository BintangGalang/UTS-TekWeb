<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
{
    Schema::create('kramas', function (Blueprint $table) {
        $table->string('krama_id')->primary();
        $table->string('nik')->unique();
        $table->string('nama');
        $table->enum('gender', ['L', 'P']);
        $table->enum('status', ['krama desa', 'krama tamiu', 'tamiu']);
        $table->string('alamat')->nullable();
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
        Schema::dropIfExists('kramas');
    }
};
