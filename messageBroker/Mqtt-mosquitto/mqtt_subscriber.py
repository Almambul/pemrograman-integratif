import paho.mqtt.client as mqtt

# Callback function ketika koneksi dengan broker berhasil dibuat
def on_connect(client, userdata, flags, rc):
    print("Terhubung ke broker MQTT")
    client.subscribe("<topic>")  # Melanggani topik yang diinginkan

# Callback function ketika pesan diterima
def on_message(client, userdata, msg):
    print("Pesan diterima: " + msg.payload.decode())

# Konfigurasi broker MQTT
broker_address = "localhost"
# membuat objek klien
client = mqtt.Client()

# Mengatur callback functions
# mastiin fungsi on connect dipanggil kalo koneksi berhasil dibuat
client.on_connect = on_connect
# mastiin fungsi on message dipanggil kalo pesan diterima
client.on_message = on_message

# Terhubung ke broker MQTT
client.connect(broker_address)

# Menjalankan loop untuk menerima pesan
client.loop_forever()
