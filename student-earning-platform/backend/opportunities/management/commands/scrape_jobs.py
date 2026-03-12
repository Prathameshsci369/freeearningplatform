from django.core.management.base import BaseCommand
from opportunities.scrapers import OpportunityScraper

class Command(BaseCommand):
    help = 'Scrapes opportunities from external platforms'

    def handle(self, *args, **options):
        scraper = OpportunityScraper()
        
        self.stdout.write("Starting scraping process...")
        
        # Run the scrapers
        scraper.scrape_remoteok()
        
        self.stdout.write(self.style.SUCCESS('Scraping completed successfully!'))