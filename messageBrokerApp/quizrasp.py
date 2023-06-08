import RPi.GPIO as GPIO
import time

# Konfigurasi pin
TRIG = 23 
ECHO = 24

print("Jarak Pengukuran Sedang Berjalan")

# Atur mode pin
GPIO.setmode(GPIO.BCM)

# Atur TRIG sebagai output dan ECHO sebagai input
GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)

try:
    while True:
        GPIO.output(TRIG, False)
        print("Tunggu Sensor Menstabilkan")
        time.sleep(2)

        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)

        while GPIO.input(ECHO)==0:
            pulse_start = time.time()

        while GPIO.input(ECHO)==1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start

        # Mengubah waktu menjadi jarak
        distance = pulse_duration * 17150

        distance = round(distance, 2)

        print("Jarak:",distance,"cm")

        # Tunda sebelum pengukuran berikutnya
        time.sleep(1)

except KeyboardInterrupt:
    print("Pengukuran dihentikan oleh Pengguna")
    GPIO.cleanup()