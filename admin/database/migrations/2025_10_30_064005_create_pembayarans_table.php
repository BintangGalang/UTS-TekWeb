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
    Schema::create('pembayarans', function (Blueprint $table) {
        $table->string('pembayaran_id')->primary();
        $table->string('tagihan_id');
        $table->date('tgl_bayar')->nullable();
        $table->integer('jumlah')->nullable();
        $table->string('status')->default('belum bayar');
        $table->string('payment_by')->nullable();
        $table->timestamps();

        $table->foreign('tagihan_id')->references('tagihan_id')->on('tagihans')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pembayarans');
    }
};
