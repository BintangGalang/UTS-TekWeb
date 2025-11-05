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
    Schema::create('tagihans', function (Blueprint $table) {
        $table->string('tagihan_id')->primary();
        $table->string('iuran');
        $table->integer('dedosan');
        $table->integer('peturunan');
        $table->string('created_by')->nullable();
        $table->string('krama_id');
        $table->date('tgl');
        $table->timestamps();

        $table->foreign('krama_id')->references('krama_id')->on('kramas')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tagihans');
    }
};
