import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта (имя, телефон, источник) и передаёт её в Google Таблицу через Google Apps Script"""
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_str = event.get('body') or '{}'
    try:
        data = json.loads(body_str)
    except json.JSONDecodeError:
        data = {}

    name = (data.get('name') or '').strip()
    phone = (data.get('phone') or '').strip()
    comment = (data.get('comment') or '').strip()
    source = (data.get('source') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'name and phone are required'})
        }

    script_url = os.environ.get('GOOGLE_APPS_SCRIPT_URL', '')
    if script_url:
        payload = json.dumps({'name': name, 'phone': phone, 'comment': comment, 'source': source}).encode('utf-8')
        req = urllib.request.Request(
            script_url,
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        try:
            with urllib.request.urlopen(req, timeout=3) as resp:
                resp.read()
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'status': 'ok'})
    }