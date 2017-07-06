import json

import decimal
import pdb

from dateutil import parser
from zeep.helpers import serialize_object


def serializar(object):
    object_ser = serialize_object(object)
    object_ser = object_ser['Paises']['PaisEntity']
    # del object_ser['TimeStamp']
    return json.dumps(object_ser)


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            o = float(o) * 1.20
            return float(o)
        return super(DecimalEncoder, self).default(o)

def parsearFecha(fecha):
    fecha_str = fecha[:-6].__str__()
    fecha_date = parser.parse(retiro_str)
    fecha_ret = datetime.datetime.strptime(retiro_date.__str__()[:-6], '%Y-%m-%d %H:%M:%S')
