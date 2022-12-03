# tarea3_emergentes

# IP AWS
Endpints disponibles en http://54.159.58.120:3000/

# Autorizacion

Todas las solicitudes a la API requieren el uso de una API KEY generada. Para autenticar una solicitud de API, debe proporcionar su clave de API en la URL o por el body para el caso de sensor_data

# Admin
- Este puede crear compañias
- Este puede crear locaciones
- Este puede crear sensores

## crear compañia
- endpint: http://54.159.58.120:3000/api/v1/admin/create-company

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_name  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|

companys existentes

1,facebook,6LZs3BFaybAFh77F1VJie7
2,google,NBmJCx1xpawCfjp1x1ggjR
3,amazon,QA9NDY5uksarXjEAyRKf9n

## crear locación
- endpint: http://54.159.58.120:3000/api/v1/admin/create-location/:company_api_key

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_id  | Integer | Requerido. Nombre de la compañia, enviado por Body en formato json|
| location_name  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| location_country  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| location_city  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| location_meta  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| company_api_key  | String | Requerido. API KEY de la compañia, enviado por Header|

## crear sensor
- endpint: http://54.159.58.120:3000/api/v1/admin/create-sensor

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| location_id  | Integer | Requerido. Nombre de la compañia, enviado por Body en formato json|
| sensor_name  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| sensor_category  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| location_city  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|
| sensor_meta  | String | Requerido. Nombre de la compañia, enviado por Body en formato json|


# Location
- Muestra todo
- Muestra uno
- Edita
- Elimina 

## Muestra todo
- endpint: http://54.159.58.120:3000/api/v1/location/:company_api_key/:company_id

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_id  | Integer | Requerido. ID de la compañia, enviado por Body en formato json|
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
## Muestra uno

- endpint: http://54.159.58.120:3000/api/v1/location/one-location/:company_api_key/:company_id/:location_id

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| location_id  | Integer | Requerido. ID location, enviado por Header|


## Edita
- endpint: http://54.159.58.120:3000/api/v1/location/edit-location/:company_api_key/:company_id/:location_id

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| location_id  | Integer | Requerido. ID location, enviado por Header|
| location_name  | String | Requerido. Nombre de la locacion, enviado por Body en formato json|
| location_country  | String | Requerido. Pais de la locacion, enviado por Body en formato json|
| location_city  | String | Requerido. Ciudad de la locacion, enviado por Body en formato json|
| location_meta  | String | Requerido. Meta de la locacion, enviado por Body en formato json|

## Elimina
- endpint: http://54.159.58.120:3000/api/v1/location/delete-location/:company_api_key/:company_id/:location_id

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| location_id  | Integer | Requerido. ID locacion, enviado por Header|

# Sensor
- Muestra todo
- Muestra uno
- Edita
- Elimina 

## Muestra todo
- endpint: http://54.159.58.120:3000/api/v1/sensor/:company_api_key/:company_id/

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|

## Muestra uno

- endpint: http://54.159.58.120:3000/api/v1/sensor/one-sensor/:company_api_key/:company_id/:id_sensor

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| id_sensor  | Integer | Requerido. ID sensor, enviado por Header|


## Edita
- endpint: http://54.159.58.120:3000/api/v1/sensor/edit-sensor/:company_api_key/:company_id/:id_sensor

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| id_sensor  | Integer | Requerido. ID sensor, enviado por Header|
| sensor_name  | String | Requerido. Nombre del sensor, enviado por Body en formato json|
| sensor_category  | String | Requerido. categoria sensor, enviado por Body en formato json|
| sensor_meta  | String | Requerido. Meta sensor, enviado por Body en formato json|


## Elimina
- endpint: http://54.159.58.120:3000/api/v1/sensor/delte-sensor/:company_api_key/:company_id/:location_id

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| company_id  | Integer | Requerido. ID de la compañia, enviado por Header|
| id_sensor  | Integer | Requerido. ID sensor, enviado por Header|

## Sensor_data 
- Insert
- Get 

## Insert
- endpint: http://54.159.58.120:3000/api/v1/sensor_data

### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| sensor_data  | String |  Requerido.  Datos del sensor enviado por Body en formato json (Arreglo de objetos)|
| sensor_api_key  | Integer | Requerido. API KEY del sensor enviado por Body en formato json|

## Get
- endpint: http://54.159.58.120:3000/api/v1/sensor_data/:company_api_key/:from/:to/:array_sensors
### Parametros
| Nombre  | Tipo  | Descripcion | 
| ------------- | ------------- | ------------- |
| company_api_key  | String |  Requerido. API KEY de la compañia, enviado por Header|
| from  | Integer | Requerido. Límite inferior de Epoch, enviado por Header|
| to  | Integer | Requerido. Límite superior de Epoch, enviado por Header|
| array_sensors  | Array de numeros enteros | Requerido. Matriz de identificación de sensores, enviado por Header|

