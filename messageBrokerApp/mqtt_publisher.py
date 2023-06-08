# mengimpor pustaka paho.mqtt.publish yang digunakan untuk mengirim pesan menggunakan protokol MQTT.
import paho.mqtt.publish as publish

# Konfigurasi broker MQTT
# mendefinisikan alamat broker MQTT yang akan digunakan untuk mengirim pesan
broker_address = "localhost"
# mendefinisikan topik MQTT yang akan digunakan untuk mengirim pesan
topic = "<topic>"
message = "halo, ini adalah implementasi broker MQTT mengirim pesan"

# Mengirim pesan
# Baris ini mengirim pesan ke broker MQTT dengan menggunakan fungsi publish.single(). Fungsi ini menerima 
# tiga parameter: topic (topik MQTT), message (pesan yang akan dikirim), dan hostname (alamat broker MQTT). 
# Pesan akan dikirim ke topik yang ditentukan.
publish.single(topic, message, hostname=broker_address)

print("Pesan terkirim!")
