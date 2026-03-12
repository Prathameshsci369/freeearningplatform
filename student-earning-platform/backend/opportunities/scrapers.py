import requests
from datetime import datetime
from config.firebase_config import db

class OpportunityScraper:
    def __init__(self):
        self.collection = db.collection('opportunities')

    def scrape_remoteok(self):
        """
        Scrapes RemoteOK.io API for developer jobs
        """
        print("Scraping RemoteOK...")
        url = "https://remoteok.com/api"
        headers = {'User-Agent': 'Mozilla/5.0'} # Required to prevent blocking
        
        try:
            response = requests.get(url, headers=headers)
            data = response.json()
            
            count = 0
            # Skip the first element (metadata) and loop through jobs
            for job in data[1:]: 
                # Basic filtering for relevant jobs
                if 'developer' in job.get('position', '').lower() or 'engineer' in job.get('position', '').lower():
                    
                    job_data = {
                        'title': job.get('position', 'Unknown Title'),
                        'description': job.get('description', '')[:500], # Truncate description
                        'platform': 'RemoteOK',
                        'category': 'Freelancing', # Default for now
                        'skills_required': job.get('tags', [])[:3], # Take top 3 tags
                        'skill_level': 'Intermediate', # Default
                        'pay_range': 'Not Specified',
                        'income_type': 'Active',
                        'external_link': job.get('url', ''),
                        'date_posted': datetime.now().strftime('%Y-%m-%d'),
                        'is_active': True
                    }

                    # Save to Firestore
                    self.save_opportunity(job_data)
                    count += 1
            
            print(f"Saved {count} jobs from RemoteOK.")
            return count

        except Exception as e:
            print(f"Error scraping RemoteOK: {e}")
            return 0

    def save_opportunity(self, data):
        # Add a document to Firestore
        doc_ref = self.collection.document()
        doc_ref.set(data)