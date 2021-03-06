package com.navinfo.mapspotter.foundation.io.mongo;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import org.bson.conversions.Bson;

import java.util.List;

/**
 * Created by SongHuiXing on 2016/1/5.
 */
public class MongoOperator {
    public enum FilterType{
        EQ,
        NEQ,
        GT,
        GTE,
        LT,
        LTE,
    }

    private Bson filterResult = null;

    public Bson getFilter(){
        return filterResult;
    }

    public <T> void and(FilterType type, String fieldname, T reference){
        Bson fBson = filterValue(type, fieldname, reference);

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.and(filterResult, fBson);
    }

    public <T> void andIn(boolean isIn, String fieldname, Iterable<T> reference){
        Bson fBson = contain(isIn, fieldname, reference);

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.and(filterResult, fBson);
    }

    public void and(MongoOperator filter){
        Bson fBson = filter.getFilter();

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.and(filterResult, fBson);
    }

    public <T> void or(FilterType type, String fieldname, T reference){
        Bson fBson = filterValue(type, fieldname, reference);

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.or(filterResult, fBson);
    }

    public <T> void orIn(boolean isIn, String fieldname, Iterable<T> reference){
        Bson fBson = contain(isIn, fieldname, reference);

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.or(filterResult, fBson);
    }

    public void or(MongoOperator filter){

        Bson fBson = filter.getFilter();

        if(null == filterResult)
            filterResult = fBson;
        else
            filterResult = Filters.or(filterResult, fBson);
    }

    private <T> Bson filterValue(FilterType type, String fieldname, T reference){
        switch(type){
            case EQ:
                return Filters.eq(fieldname, reference);
            case NEQ:
                return Filters.ne(fieldname, reference);
            case GT:
                return Filters.gt(fieldname, reference);
            case GTE:
                return Filters.gte(fieldname, reference);
            case LT:
                return Filters.lt(fieldname, reference);
            case LTE:
                return Filters.lte(fieldname, reference);
        }

        return null;
    }

    private <T> Bson contain(boolean isIn, String fieldname, Iterable<T> reference){
        if(isIn)
            return Filters.in(fieldname, reference);
        else
            return Filters.nin(fieldname, reference);
    }

    public Bson getProject(boolean isContains, List<String> fields){
        if(isContains)
            return Projections.include(fields);
        else
            return Projections.exclude(fields);
    }
}
